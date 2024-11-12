import { statusOpt, typeOpt } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import {
  createJob,
  setError,
  setJobs,
  setLoading,
} from "../redux/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddJob = () => {
  const state = useSelector((store) => store.jobSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading());

    axios

      .get("http://localhost:4000/jobs")

      //veriler gelirse store akatar

      .then((res) => dispatch(setJobs(res.data)))

      //hata olursa Store gunceller

      .catch((err) => dispatch(setError(err.message)));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    //inputlardaki verilere erismek gerekir

    const formData = new FormData(e.target);
    const newJob = Object.fromEntries(formData.entries());

    //tarih ve id Ekle

    newJob.id = v4();
    newJob.date = new Date().toLocaleDateString();

    axios
      .post("http://localhost:4000/jobs", newJob)
      .then(() => {
        toast.success("Yeni is Eklendi");
        dispatch(createJob(newJob));
        navigate("/");
      })
      .catch(() => {
        toast.warn("Ekleme isleminde sorun olustu");
      });
  };
  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni iş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="positions" name="position" type="text" required />

            <datalist id="positions">
              {state.jobs.map((i) => (
                <option value={i.position} key={i.id} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Şirket</label>
            <input list="companies" name="company" type="text" required />

            <datalist id="companies">
              {state.jobs.map((i) => (
                <option value={i.company} key={i.id} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Lokasyon</label>
            <input list="locations" name="location" type="text" required />

            <datalist id="locations">
              {state.jobs.map((i) => (
                <option value={i.location} key={i.id} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {statusOpt.map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {typeOpt.map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="button-borders">
              <button>
                <a>İş Ekle</a>
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
