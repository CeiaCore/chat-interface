import axios from "axios";
import { ConfigHeader } from "../config/ConfigHeader";
import React, { useEffect } from "react";

const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/notification_router";

export const useGetAllNotification = () => {
  const [notifications, setNotifications] = React.useState([]);
  const { config } = ConfigHeader();
  const handleGetAllNotification = async () => {
    const response = await axios.get(`${URL}${PATH_DEFAULT}/get_all`, config);

    if (response?.data) {
      setNotifications(response?.data?.notifications);
    }
  };

  useEffect(() => {
    handleGetAllNotification();
  }, []);

  return { notifications };
};
