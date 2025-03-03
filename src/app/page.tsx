"use client";
import "./estilo.css";

export default function Home() {
  return (
    <div>
        <main >
          <h1 className="header">Project with API</h1>
          
          <div>
            <form className="box" >
              <input  type="text" className="search" placeholder="Search a city"/>
            </form>
          </div>
        

        </main> 
    </div>
  );
}
