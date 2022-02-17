const Router = require('express').Router();
const userController = require('../controllers/userController');
const { auth, adminAuth } = require('../../middleware/auth');

const multer = require('multer');
const upload = multer({ dest: 'public/images/users' });

Router.get('/', auth, adminAuth, userController.getAllUsers);
Router.get('/me', auth, userController.getUserProfile);
Router.get('/image/me', auth, userController.getImage);
Router.get('/:id', auth, adminAuth, userController.getEachUser);
Router.post('/', userController.addUser);
Router.post('/login', userController.login);
Router.post('/logout', auth, userController.logout);
Router.post('/logoutAll', auth, userController.logoutAll);
Router.post(
  '/changePassword/me',
  auth,
  userController.changePasswordByLoginUser
);
Router.put('/:id', auth, adminAuth, userController.updateUser);
Router.put('/profile/me', auth, userController.updateUserProfile);
Router.put(
  '/profile/photo/me',
  upload.single('userImage'),
  auth,
  userController.uploadImage
);
Router.delete('/:id', auth, userController.deleteUser);
Router.delete('/profile/me', auth, userController.deleteUserProfile);
Router.delete('/image/me', auth, userController.deleteImage);

module.exports = Router;
