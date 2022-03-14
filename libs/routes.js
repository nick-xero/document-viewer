const express = require('express');

const {
  createFile, getFile, getAllFiles, removeFile, updateFile,
} = require('./files');

const router = express.Router();

router.post('/files', async (req, res) => {
  const { username, filename, filetype } = req.body;
  try {
    const { id } = await createFile({ username, filename, filetype });
    res.send({ id });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/files/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const file = await getFile({ id });
    res.send(file);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.put('/files/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await updateFile({ id, body });
    res.send({ id });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/files', async (req, res) => {
  try {
    const files = await getAllFiles();
    res.send(
      files.map((file) => ({
        username: file.username,
        filename: file.filename,
        filetype: file.filetype,
        id: file._id,
      })),
    );
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete('/files/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await removeFile({ id });
    res.status(200).send({ id });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
