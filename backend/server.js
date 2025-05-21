require('dotenv').config();
console.log("JWT Secret:", process.env.JWT_SECRET);

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Brak tokenu');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 👈 dodajemy użytkownika do żądania
    next();
  } catch (err) {
    res.status(400).send('Nieprawidłowy token');
  }
};


const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Flashcard = require('./models/Flashcard'); // import modelu fiszki
const Folder = require('./models/Folder');
const app = express();

app.use(express.json()); // Middleware do obsługi JSON

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost/TestYourself', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Schemat i model użytkownika
const User = mongoose.model('User', new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

// Rejestracja użytkownika
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Logowanie użytkownika
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).send('Invalid email or password');
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Zapis fiszek - teraz kazda fiszka bedzie z przypisanym uzytkownikiem
app.post('/flashcards', auth, async (req, res) => {
  try {
    console.log(' Użytkownik z tokena:', req.user);
    const userId = req.user._id;
    const flashcardsWithUser = req.body.flashcards.map(card => ({
      ...card,
      userId
    }));

    const saved = await Flashcard.insertMany(flashcardsWithUser);
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd zapisu fiszek' });
  }
});

//endpoint do zapisu folderow 
app.post('/folders', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;

    const newFolder = new Folder({ name, userId });
    const savedFolder = await newFolder.save();

    res.status(201).json(savedFolder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd zapisu folderu' });
  }
});

// Pobieranie folderów dla zalogowanego usera
app.get('/folders', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const folders = await Folder.find({ userId });
    res.json(folders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd pobierania folderów' });
  }
});

app.get('/flashcards/:folderName', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { folderName } = req.params;

    const flashcards = await Flashcard.find({ userId, folderName });
    res.json(flashcards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd pobierania fiszek' });
  }
});


// Usuwanie fiszki
app.delete('/flashcards/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deleted = await Flashcard.findOneAndDelete({ _id: id, userId });
    if (!deleted) return res.status(404).json({ message: 'Fiszka nie znaleziona' });

    res.json({ message: 'Fiszka usunięta' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd przy usuwaniu fiszki' });
  }
});

// USUWANIE folderu + fiszek powiązanych z tym folderem
app.delete('/folders/:id', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const folderId = req.params.id;

    // 1. Znajdź folder, żeby znać jego nazwę
    const folder = await Folder.findOne({ _id: folderId, userId });
    if (!folder) return res.status(404).json({ message: 'Folder nie znaleziony' });

    // 2. Usuń fiszki powiązane z nazwą folderu i użytkownikiem
    await Flashcard.deleteMany({ folderName: folder.name, userId });

    // 3. Usuń folder
    await Folder.deleteOne({ _id: folderId });

    res.status(200).json({ message: 'Folder i powiązane fiszki zostały usunięte' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd usuwania folderu/fiszek' });
  }
});

// Ustawienie portu serwera
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
