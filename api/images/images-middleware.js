const Image = require('./images-model');

const validateImageExistsByImageId = async (req, res, next) => {
  const { image_id } = req.params;

  try {
    const image = await Image.findById(image_id);
    if(image){
      req.image = image;
      next();
      
    } else {
      next({
        status: 404,
        message: 'image does not exist'
      })
    }
  } catch (err) {
    next(err);
  }
}

const validateImageRequiredFields = async (req, res, next) => {
  const { src, title, name, alt } = req.body;

  if(!src){
    next({
      status: 400,
      message: 'src is a required field'
    });
  } else if(!title){
    next({
      status: 400,
      message: 'title is a required field'
    });
  } else if(!name){
    next({
      status: 400,
      message: 'name is a required field'
    });
  } else if(!alt){
    next({
      status: 400,
      message: 'alt is a required field'
    });
  } else {
    next();
  }
}

const validateImageNameUnique = async (req, res, next) => {
  const { name } = req.body;

  try {
    const images = await Image.findBy({ image_name: name });
    if(images.length === 0){
      next();
    } else {
      next({
        status: 400,
        message: 'image name must be unique'
      })
    }
  } catch (err) {
    next(err);
  }
}

const validateImageSrcUnique = async (req, res, next) => {
  const { src } = req.body;

  try {
    const images = await Image.findBy({ image_src: src });
    if(images.length === 0){
      next();
    } else {
      next({
        status: 400,
        message: 'image src must be unique'
      })
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateImageExistsByImageId,
  validateImageRequiredFields,
  validateImageNameUnique,
  validateImageSrcUnique
}