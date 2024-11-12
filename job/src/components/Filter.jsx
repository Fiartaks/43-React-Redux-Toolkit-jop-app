import { useEffect, useState } from "react"
import { sortOpt, statusOpt, typeOpt } from "../constants"
import { useDispatch } from "react-redux"
import { filterBySearch } from "../redux/slices/jobSlice"

const Filter = ({jobs}) => {

   const [text, setText]=useState('')
   const dispatch = useDispatch()

   //!her tus vurusunda filtreleme yapmak uygulamada yavaslamlaara sebep olabilir ve gereksiz 
   //yere api iste kleriine sebep olur. Her tus vurusunda yapmak nyerine kullanici yazmayi bitirdiginde filterleme yapmamiz gerekir. Bu islemede DEBOUNCE denir. 

   useEffect(()=>{
     
     const timer = setTimeout(()=>{
       dispatch(filterBySearch({field: 'position', text }))
     
    }, 500)
     return () => clearTimeout(timer)

   }, [text])


  return (
    <section className="filter-sec">
        <h2>Filtreleme Formu</h2>
        <form>
            <div>
                <label>Şirket İsmine göre ara</label>
                <input onChange={(e)=> setText(e.target.value)} type="text"  />
            </div>

            <div>
            <label>Durum</label>
            <select onChange={(e)=> dispatch(filterBySearch({field:'status',text:e.target.value,}))} name="status" >
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
            <select
            
            onChange={(e)=> dispatch(filterBySearch({field:'type', text: e.target.value,}))}
            
            name="type" >
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
            <div >
              <button>
                <a>FİlTRELE</a>
              </button>
            </div>
          </div>
           


        </form>
        </section>
  )
}
export default Filter