import User from "../../models/noSql/user";
import { returnType } from "../../configuration/helperServices/helperService";
import { eApiErrorMessages, eUserError } from "../../models/enum/auth_enum";

const bcrypt = require("bcrypt");

export const userCreate = (request: any, response: any) => {
  User.findOne({ email: request.body.email }).exec((err, user) => {
    if (user) {
      return returnType(response, 400, eUserError.user400, null);
    }
  });

  const { username, name, email, phone, accessType, about, photo, password } =
    request.body;
  bcrypt
    .hash(password, 12)
    .then((hashPw: any) => {
      const profile = `${process.env.CLIENT_URL || "user"}/profile/${username}`;

      const newUser = new User({
        name: name,
        email: email,
        password: hashPw,
        profile: profile,
        username: username,
        phone: phone,
        about: about,
        photo: photo,
        accessType: accessType,
      });

      return newUser.save();
    })
    .then((result: any) => {
      return returnType(response, 201, "User created", result._id);
    })
    .catch((error: any) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      return returnType(
        response,
        500,
        eApiErrorMessages.apiNoClueError_0,
        error
      );
    });
};

export const userRead = (request: any, response: any) => {
  const currentPage = request.query.page || 1;
  const perPage = request.query.pageSize || 5;
  let totalItems: any;
  User.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return User.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((user) => {
      return response.status(200).json({
        message: "Fetched user successfully.",
        users: user,
        pageNo: currentPage,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return response
        .status(500)
        .json({ message: eApiErrorMessages.api500Error });
    });
};

export const userReadbyId = (request: any, response: any) => {
  const userId = request.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return returnType(response, 404, eUserError.user404);
      }
      return returnType(response, 200, `User find by _id ${userId}!!`, user);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return returnType(response, 500, eApiErrorMessages.api500Error);
    });
};

export const userUpdateById = (request: any, response: any) => {
  const userId = request.params.userId;
  const { username, name, email, phone, accessType, about, photo } =
    request.body;
  User.findOne(userId)
    .then((user: any) => {
      if (!user) {
        return returnType(response, 404, eUserError.user404);
      }
      user.username = username;
      user.name = name;
      user.email = email;
      user.phone = phone;
      user.accessType = accessType;
      user.about = about;
      user.photo = photo;

      return user.save();
    })
    .then((result) => {
      return returnType(response, 200, "User update successfully!", result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return returnType(response, 500, eApiErrorMessages.api500Error, err);
    });
};

export const userUpdatePassword = (request: any, response: any) => {
  const userId = request.params.userId;
  const { oldPassowrd, newPassword } = request.body;
  let userData: any;
  User.findOne(userId)
    .then((user: any) => {
      if (!user) {
        return returnType(response, 404, eUserError.user404);
      }
      userData = user;
      return bcrypt.compare(oldPassowrd, user?.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        return returnType(response, 401, eUserError.user401, null);
      }
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashPass) => {
      userData.password = hashPass;
      return userData.save();
    })
    .then((result) => {
      return returnType(
        response,
        200,
        "User password change successfully!",
        null
      );
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return returnType(response, 500, eApiErrorMessages.api500Error, err);
    });
};

export const userDelete = (request: any, response: any) => {
  const usersIds = request.body.ids || [];
  User.deleteMany({
    _id: {
      $in: usersIds,
    },
  })
    .then((result) => {
      return returnType(response, 200, `Users removed!!`);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return returnType(response, 500, eApiErrorMessages.api500Error, err);
    });
};

export const userDeleteById = (request: any, response: any) => {
  const userId = request.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return returnType(response, 404, eUserError.user404);
      }
      return User.findByIdAndRemove(userId);
    })
    .then((result) => {
      return returnType(response, 200, `User _id ${userId} removed!!`);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return returnType(response, 500, eApiErrorMessages.api500Error, err);
    });
};
