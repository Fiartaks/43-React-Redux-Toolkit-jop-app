import { useDispatch, useSelector } from "react-redux";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Filter from "../components/Filter";

const JobList = () => {
  const dispatch = useDispatch();

  const state = useSelector((store) => store.jobSlice);

  //Apiden verilieri al store akatar.
  const fetchData = () => {
    //yuklenme durumunu gunceller

    dispatch(setLoading());

    axios

      .get("http://localhost:4000/jobs")

      //veriler gelirse store akatar

      .then((res) => dispatch(setJobs(res.data)))

      //hata olursa Store gunceller

      .catch((err) => dispatch(setError(err.message)));
  };

  //bilesen ekrana basildiginda ekrana cagir
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list-page">

     <Filter jobs={state.jobs} />

      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <div className="error">
          <p>
            Üzgününz verilere erişirken bir sorun oluştu{" "}
            <span>{state.isError}</span>
          </p>
          <button onClick={fetchData}>
            <a>TEKRAR DENE</a>
          </button>
        </div>
      ) : (
        <div className="job-list">
          {state.jobs.map((job) => (
            <Card job={job} key={job.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
