import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER } from "../graphql/actions/getUser.action";

const useUser = () => {
  const { loading, data } = useQuery(GET_USER);
  console.log(data);
  return {
    loading,
    user: data?.getLoggedInUser?.user,
  };
};

export default useUser;
