import Link from "next/link";
import { LogOut } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans relative overflow-hidden" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
      {/* Top Green Banner */}
      <div style={{ backgroundColor: "rgb(184, 225, 176)" }} className="w-full h-28">
        {/* Optional: Add background SVG or wave pattern here */}
      </div>

      {/* Logout Button */}
      <div
        className="absolute right-6 flex items-center gap-1 text-sm cursor-pointer"
        style={{ top: "8.5rem", color: "rgb(255, 255, 255)" }}
      >
        <LogOut size={20} />
        Logout
      </div>

      {/* Main Content */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center px-4"
        style={{ top: "8.5rem" }}
      >
        <h1
          className="self-start text-5xl font-extrabold relative inline-block"
          style={{ color: "rgb(255, 255, 255)" }}
        >
          LET’S GET STARTED
          <div style={{ 
            width: "9rem",
            height: "0.25rem", 
            backgroundColor: "rgb(46, 91, 82)",
            marginTop: "0.25rem", 
            borderRadius: "0.125rem" }} />
        </h1>

        {/* Buttons */}
        <div className="flex gap-40 mt-25">
          {/* HOST Button */}
          <Link href="/admin">
          <div
            className="w-60 h-40 border-4 rounded-2xl flex flex-col items-center justify-start"
            style={{ borderColor: "rgb(46, 91, 82)" , 
              boxShadow: "0 8px 16px rgba(255, 255, 255, 0.24)",
              backgroundColor:"rgba(163, 208, 198)"
            }}
          >
            <div
              className="w-16 h-16 bg-contain bg-no-repeat bg-center mb-2"
              style={{ backgroundImage: "url('/your-icon-path.svg')" }}
            ></div>
            <span style={{ color: "rgb(255, 255, 255)", 
            fontWeight: "bold",
            fontSize: "1.5rem", 
            marginTop: "-0.75rem" 
            }}>HOST</span>
          </div>
          </Link>
          {/* JOIN A TEST Button */}
          <Link href="/join">
          <div
            className="w-60 h-40 border-4 rounded-2xl flex flex-col items-center justify-start"
            style={{ 
              borderColor: "rgb(46, 91, 82)",
               boxShadow: "0 8px 16px rgba(255, 255, 255, 0.25)",
               backgroundColor:"rgba(163, 208, 198)"
               
               }}
          >
            <div
              className="w-16 h-16 bg-contain bg-no-repeat bg-center mb-2 "
              style={{ 
                backgroundImage: "url('/your-icon-path.svg')"
               }}
            ></div>
            <span style={{ 
              color: "rgb(255, 255, 255)", 
              fontWeight: "bold", 
              textAlign: "center",
              fontSize: "1.5rem", 
              marginTop: "-0.75rem"
             }}>
              JOIN A TEST
            </span>
          </div>
          </Link>
        </div>

        {/* Bottom Center Footer */}
        <div className="mt-12 text-sm text-center" style={{ color: "rgb(55, 65, 81)" }}>
          
          <div
            style={{
               width: "8rem", 
               height: "0.35rem", 
               backgroundColor: "rgb(46, 91, 82)", 
               marginTop: "0.5rem",
               marginBottom: "2rem", 
               borderRadius: "9999px", 
               marginLeft: "auto", 
               marginRight: "auto" 
              }}
          />
        </div>
        <span ><span style={{ color: "rgb(255, 255, 255)" }}>Made with </span><span style={{ color: "rgb(239, 68, 68)" }}>❤️</span><span style={{ color: "rgb(255, 255, 255)" }}>by<b>  SOSC</b></span></span>
      </div>

      {/* Bottom Green Banner */}
      <div
        className="w-full h-28 absolute bottom-0 left-0"
        style={{ backgroundColor: "rgb(184, 225, 176)" }}
      >
        {/* Optional: Add matching pattern or shape here */}
      </div>
    </div>
  );
}
