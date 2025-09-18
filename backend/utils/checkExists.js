const checkExists = async (model, id, res, resourceName = 'Resource') => {
  const resource = await model.findById(id);
  if (!resource) {
    res.status(404);
    throw new Error(`${resourceName} not found`);
  }
  return resource;
};

module.exports = checkExists;
