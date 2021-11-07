import { useContext, useState } from "react";
import axios from "axios";
import MessageContext from "../context/messages/MessageContext";
import AuthContext from "../context/Auth/AuthContext";
function useApi() {
  const Message = useContext(MessageContext);
  const Auth = useContext(AuthContext);
  const Base_Url = "http://localhost";
  const [Data, updateData] = useState([]);
  const [isError, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const axiosJWT = axios.create();
  const getRefreshToken = async (config) => {
    await axios
      .post(Base_Url + "/ExchangeToken/newToken", {
        UserId: Auth.User._id,
        Email: Auth.User.Email,
        RefreshToken: Auth.RefreshToken,
      })
      .then(
        (data) => {
          Auth.UpdateToken(data.data.data);
          config.headers.token = data.data.data.AccessToken;
          return config;
        },
        () => {
          Auth.LogOut();
          Message.Add_Message("Error", "Session Expired");
        }
      );
  };
  axiosJWT.interceptors.request.use(
    async (config) => {
      try {
        await getRefreshToken(config)
          .then((updated_config) => {
            return updated_config;
          })
          .catch((error) => {
            Message.Add_Message("Error", "Session Expired");
            Auth.LogOut();
            Promise.reject(error);
          });
      } catch (error) {
        Message.Add_Message("Error", "Session Expired");
        Auth.LogOut();
        return Promise.reject(error);
      }
    },
    (error) => {
      Message.Add_Message("Error", "Session Expired");
      Auth.LogOut();
      Promise.reject(error);
    }
  );
  const Request = async (
    isAuth = false,
    target = "/",
    headers = {},
    method = "GET",
    data = {},
    ErrorMessage = ""
  ) => {
    setError(false);
    setLoading(true);
    try {
      isAuth &&
        (await axios(Base_Url + target, {
          method: method,
          headers: headers,
          data: data,
        })
          .then((data) => {
            if (data) {
              updateData(data.data);
              Message.Add_Message(
                data.data.Status,
                data.data.Message ||
                  data.data.data.Message ||
                  data.data.ErrorMessage
              );
            } else {
              setError(true);
              Message.Add_Message("Error", ErrorMessage);
            }
          })
          .catch((error) => {
            setError(true);
            Message.Add_Message("Error", ErrorMessage);
          }));

      !isAuth &&
        (await axiosJWT(Base_Url + target, {
          method: method,
          headers: headers,
          data: data,
        })
          .then((data) => {
            if (data) {
              updateData(data.data);
              Message.Add_Message(
                data.data.Status,
                data.data.Message ||
                  data.data.data.Message ||
                  data.data.ErrorMessage
              );
            } else {
              setError(true);
              Message.Add_Message("Error", ErrorMessage);
            }
          })
          .catch((error) => {
            setError(true);
            Message.Add_Message("Error", ErrorMessage);
          }));
    } catch (error) {
      setError(true);
      Message.Add_Message("Error", ErrorMessage);
    }
    setLoading(false);
  };
  return { Request, Data, Loading, isError };
}

export default useApi;
