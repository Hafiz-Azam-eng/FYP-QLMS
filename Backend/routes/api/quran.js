// In your routes file, e.g., routes/ayah.js
const express = require('express');
const router = express.Router();
const Ayah = require('../../models/Ayah');

// GET translation for a specific Surah for FatehMuhammadJalandhri
router.get('/ayahs/fateh/:suraID', (req, res) => {
  const { suraID } = req.params;

  Ayah.findOne({ SuraID: suraID })
    .select('SuraID FatehMuhammadJalandhri ArabicText')
    .then((ayah) => {
      if (!ayah) {
        return res.status(404).json({ error: 'Ayah not found' });
      }

      res.json({
        suraID: ayah.SuraID,
        author: 'FatehMuhammadJalandhri',
        arabicText: ayah.ArabicText,
        translation: ayah.FatehMuhammadJalandhri
      });
    })
    .catch((error) => {
      console.error('Error retrieving Ayah:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.get('/ayahs/:ayahNo/:author', (req, res) => {
  const { ayahNo, author } = req.params;

  Ayah.findOne({ AyaNo: ayahNo })
    .select(`AyaNo ${author} ArabicText`)
    .then((ayah) => {
      if (!ayah) {
        return res.status(404).json({ error: 'Ayah not found' });
      }

      res.json({
        ayahNo: ayah.AyaNo,
        author,
        arabicText: ayah.ArabicText,
        translation: ayah[author]
      });
    })
    .catch((error) => {
      console.error('Error retrieving Ayah:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.get('/surah/:suraID/:author', (req, res) => {
  const { suraID, author } = req.params;

  Ayah.find({ SuraID: suraID })
    .select(`AyaNo ${author} ArabicText`)
    .sort('AyaNo')
    .then((ayahs) => {
      if (ayahs.length === 0) {
        return res.status(404).json({ error: 'Surah not found' });
      }

      const authorAyahs = ayahs.map((ayah) => ({
        ayahNo: ayah.AyaNo,
        arabicText: ayah.ArabicText,
        translation: ayah[author]
      }));

      res.json({
        surahID: suraID,
        author,
        ayahs: authorAyahs
      });
    })
    .catch((error) => {
      console.error('Error retrieving Ayahs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


module.exports = router;
