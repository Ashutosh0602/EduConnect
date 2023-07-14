import React, { useEffect, useState } from "react";
import classes from "./THome.module.css";
import { useSelector } from "react-redux";
import human from "../../assets/human.png";
import { Navigate, useNavigate, useParams } from "react-router";

const THome = () => {
  const userId = useSelector((state) => state.userProfile.userId);

  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const param = useParams();

  //fetching data for teacher home page using user id and displaying it on the screen (for

  console.log(userId);
  useEffect(() => {
    const panel = fetch(`http://localhost:3432/teacher/${userId}/home`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  console.log(data);
  return (
    <section>
      <div>
        {data?.["data"].map((e) => {
          return (
            <div
              className={classes.panel_cont}
              onClick={() => {
                navigate(`/teacher/${param.ID}/${e["Uid"]}`);
              }}
            >
              <div className={classes.human_cont}>
                <img src={human} />
              </div>
              <div className="text-2xl text-gray-800 text-center">
                {e["name"]}
              </div>
              <div className={`${classes.subject} text-center`}>{e["Uid"]}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default THome;
