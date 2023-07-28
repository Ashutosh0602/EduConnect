import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import classes from "./Home.module.css";
import human from "../../assets/human.png";

const OTeacher = () => {
  const param = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.userProfile.token);

  const [teacher, setTeacher] = useState([]);
  // console.log(teacher);

  useEffect(() => {
    fetch(`http://localhost:3432/student/${param.ID}/class`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setTeacher(res["data"]));
  }, []);
  return (
    <section>
      <div>Teachers</div>

      <div className="flex">
        {teacher?.map((teach) => {
          return (
            <div className={classes.panel_cont}>
              <div className={classes.human_cont}>
                <img src={human} />
              </div>
              <div className="text-2xl text-gray-800">{teach["id"]}</div>
              <div className="flex justify-between items-center">
                <div>
                  <button
                    className={classes.pay_butt}
                    onClick={() =>
                      navigate(`/student/${param.ID}/class/${teach["id"]}`)
                    }
                  >
                    Class
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OTeacher;
