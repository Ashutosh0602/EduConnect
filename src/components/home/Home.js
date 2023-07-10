import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import human from "../../assets/human.png";
import classes from "./Home.module.css";

const Home = () => {
  const userId = useSelector((state) => state.userProfile.userId);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3432/student/${userId}/`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  //     .then((res) => console.log(res));

  return (
    <section className={classes.home_cont}>
      <div>asdfasf</div>
      <div className="">
        {data?.["data"].map((e) => {
          return (
            <div className={classes.panel_cont}>
              <div className={classes.human_cont}>
                <img src={human} />
              </div>
              <div className="text-2xl text-gray-800">{e["name"]}</div>
              <div>
                <span className={classes.subject}>Subject: </span>{" "}
                <span className="text-sm italic text-gray-600">
                  {e["subject"].join(", ")}
                </span>
              </div>
              <div>
                <span className="text-sm">City: </span>
                <span className="text-sm text-gray-600">{e["location"]}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-3xl">₹{e["fees"]}</div>
                <div>
                  <button className={classes.pay_butt}>Pay</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
