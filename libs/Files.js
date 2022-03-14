const { File } = require('./file.model');

async function createFile({ username, filename, filetype }) {
  const file = new File({ username, filename, filetype });
  await file.save();
  return { id: file._id };
}

async function getFile({ id }) {
  const doc = await File.findOne({ id });
  return doc;
}

async function updateFile({ id, body }) {
  await File.updateOne({ _id: id }, body);
}

async function getAllFiles() {
  const docs = await File.find();
  return docs;
}

async function removeFile({ id }) {
  await File.remove({ _id: id });
}

module.exports = {
  createFile, getFile, getAllFiles, removeFile, updateFile,
};
