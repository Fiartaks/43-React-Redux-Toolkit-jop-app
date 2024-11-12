import axios from "axios";
import DelButton from './DelButton';

import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaSuitcase } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/slices/jobSlice";

const Card = ({ job }) => {
  const dispatch = useDispatch();
  const color = {
    "Devam Ediyor": "orange",
    Mülakat: "green",
    Reddedildi: "red",
  };

  const handleDelete = () => {
    if (confirm('Silmek istediginizden Emin misiniz?')){


      axios
      .delete(`http://localhost:4000/jobs/${job.id}`)

      .then(() => {
        toast.info("Silme islemi Basarili");
        dispatch(deleteJob(job.id));
      })
      .catch(() => {
        toast.warn("Silme islemi Basarisiz");
      });

    }

  };

  return (
    <div className="card">
      <div className="head">
        <div className="left">
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>

          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </div>

        <div className="right">
          <DelButton handleDelete={handleDelete} />
        </div>
      </div>

      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>{job.location}</p>
        </div>

        <div className="field">
          <FaSuitcase />
          <p>{job.type}</p>
        </div>

        <div className="field">
          <BsFillCalendarDateFill />
          <p>{job.date}</p>
        </div>
        <div className="status">
          <p style={{ background: color[job.status] }}>{job.status}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
