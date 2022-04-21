import { DateTime } from "luxon";
import { useState, useEffect } from "react";

const Timer = () => {
    const [timer, setTimer] = useState(DateTime.now());
    const [time, setTime] = useState("START");
    const [pause, setPause] = useState(true);
    const [subSecs, setSubSecs] = useState();

    const [isWork, setIsWork] = useState(true);

    const startTimer = (min, sec = 0) => {
        const pauseScope = !pause;

        setPause((prev) => !prev);
        clearInterval(subSecs);

        console.log(pauseScope);
        if (!pauseScope || time == "START" || time == "PAUSE") {
            if (time == "START" || time == "PAUSE") {
                setTimer((prev) => {
                    let tmpTime = prev.set({ minutes: min, seconds: sec });
                    return tmpTime;
                });
            }
            console.log("ok");
            setSubSecs(
                setInterval(() => {
                    setTimer((prev) => {
                        let tmpTime = prev;
                        tmpTime = tmpTime.minus({ seconds: 1 });
                        setTime(tmpTime.toFormat("mm:ss"));

                        if (tmpTime.toFormat("mm:ss") == "00:00") {
                            if (isWork) setTime("PAUSE");
                            else {
                                setTime("START");
                                setPause(true);
                            }
                            setIsWork((prev) => !prev);
                        }

                        return tmpTime;
                    });
                }, 1000)
            );
        }
        return () => {
            clearInterval(subSecs);
        };
    };

    const addMin = () => {
        setTimer((prev) => {
            const tmpTime = prev.plus({ minutes: 1 });
            return tmpTime;
        });
    };

    const subMin = () => {
        if (timer.toFormat("mm") !== "00") {
            setTimer((prev) => {
                const tmpTime = prev.minus({ minutes: 1 });
                return tmpTime;
            });
        }
    };
    useEffect(() => {
        if (time == "PAUSE") {
            setPause(true);
            return clearInterval(subSecs);
        }
    }, [time]);

    useEffect(() => {
        if (time != "START" && time != "PAUSE")
            setTime(timer.toFormat("mm:ss"));
    }, [timer]);

    return (
        <div className="flex justify-center items-center flex-col m-5">
            <h1 className="text-6xl">{time}</h1>
            <button
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 m-5"
                onClick={() =>
                    time == "PAUSE" ? startTimer(5) : startTimer(0, 5)
                }
            >
                {!pause ? "PAUSE" : "START"}
            </button>
            <h3 className="text-3xl">Manage time:</h3>
            <div className="flex">
                <button
                    className="text-3xl inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 m-3"
                    onClick={() => addMin()}
                >
                    +
                </button>
                <button
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 m-3"
                    onClick={() => subMin()}
                >
                    -
                </button>
            </div>
        </div>
    );
};

export default Timer;
