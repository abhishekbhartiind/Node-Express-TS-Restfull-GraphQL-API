import User from "../../models/noSql/user";
import { returnType } from "../../configuration/helperServices/helperService";
import { eApiErrorMessages, eUserError } from "../../models/enum/auth_enum";

const bcrypt = require("bcrypt");

export const userCreate = (request: any, response: any) => {
  User.findOne({ email: request.body.email }).exec((err, user) => {
    if (user) {
      return returnType(response, 404, eUserError.user404, "", true);
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
      return returnType(
        response,
        500,
        eApiErrorMessages.apiNoClueError_0,
        error
      );
    });
};

export const userRead = (request: any, response: any) => {
  const currentPage = +request?.query?.page || 1;
  const perPage = +request?.query?.pageSize || 5;
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
      let mapUser = user?.map((x: any) => {
        return {
          _id: x._id,
          name: x.name,
          email: x.email,
          profile: x.profile,
          username: x.username,
          phone: x.phone,
          accessType: x.accesType,
        };
      });
      return response.status(200).json({
        message: "Fetched user successfully.",
        users: mapUser,
        pageNo: currentPage,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      return returnType(response, 500, eApiErrorMessages.apiNoClueError_0, err);
    });
};

export const userReadbyId = (request: any, response: any) => {
  const userId = request.params.userId;
  User.findById({ _id: userId })
    .then((user: any) => {
      if (!user) {
        return returnType(response, 404, eUserError.user404, "", true);
      }
      user = [user];
      let mapUser = user?.map((x: any) => {
        return {
          _id: x._id,
          name: x.name,
          email: x.email,
          profile: x.profile,
          username: x.username,
          phone: x.phone,
          accessType: x.accesType,
        };
      });
      return returnType(response, 200, `User find by _id ${userId}!!`, mapUser);
    })
    .catch((err) => {
      return returnType(response, 500, eApiErrorMessages.api500Error, err);
    });
};

export const userUpdateById = (request: any, response: any) => {
  const userId = request.params.userId;
  const { username, name, email, phone, accessType, about, photo } =
    request.body;
  User.findOne({ _id: userId })
    .then((user: any) => {
      if (!user) {
        return returnType(response, 404, eUserError.user404, "", true);
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
      return returnType(response, 500, eApiErrorMessages.api500Error, err);
    });
};

export const userUpdatePassword = (request: any, response: any) => {
  const userId = request.params.userId;
  const { oldPassowrd, newPassword } = request.body;
  let userData: any;
  User.findOne({ _id: userId })
    .then((user: any) => {
      if (!user) {
        return returnType(response, 404, eUserError.user404, "", true);
      }
      userData = user;
      return bcrypt.compare(oldPassowrd, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        return returnType(response, 401, eUserError.user401, null, true);
      }
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashPass) => {
      userData.password = hashPass;
      return userData.save();
    })
    .then((result) => {
      return returnType(response, 200, "User password change successfully!");
    })
    .catch((err) => {
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
      return returnType(response, 500, eApiErrorMessages.api500Error, err);
    });
};

export const userDeleteById = (request: any, response: any) => {
  const userId = request.params.userId;
  User.findById({ _id: userId })
    .then((user) => {
      if (!user) {
        return returnType(response, 404, eUserError.user404, "", true);
      }
      return User.findByIdAndRemove(userId);
    })
    .then((result) => {
      return returnType(response, 200, `User _id ${userId} removed!!`);
    })
    .catch((err) => {
      return returnType(response, 500, eApiErrorMessages.api500Error, err);
    });
};
