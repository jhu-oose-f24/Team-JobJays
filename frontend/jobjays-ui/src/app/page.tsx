"use client";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import HowItWorks from "@/components/ui/Instructions";
import Statistics from "@/components/ui/Statistics";
import AboutUs from "@/components/AboutUs";
import Support from "@/components/Support";
import ContactUs from "@/components/ContactUs";
import Script from "next/script";
function trackTime() {
    let state = "visible";
    if (document.visibilityState == "visible") {
        state = "visible";
        console.log(`Flarelytics: page is ${state}`);
        //sendEvent(tracking_id, state);
    }
    document.addEventListener("visibilitychange", () => {
        let new_state = "";
        if (document.visibilityState === "visible") {
            new_state = "visible";
        } else if (document.visibilityState === "hidden") {
            new_state = "hidden";
        }

        if (new_state != state) {
            state = new_state;
            console.log(`${state}`);
            //sendEvent(tracking_id, state);
        }
    });
}

function callMe() {
    console.log("Hello from callMe function");
}


export default function Home() {
    const anonTrackingId = crypto.randomUUID();
    //const page = window.location.pathname;
    //let state = "visible";
    // useEffect(() => {
    //     //setTimeout(trackTime);
    //     trackTime();
    // },[])
    //trackTime();
    //https://github.com/VMois/flarelytics/blob/main/analytics/flarelytics.js#L1
    return (
    <>
        <Script id="tracking-script" strategy="afterInteractive">
            {`
                    function sendEvent(id, state) {
                        let anonTrackingId = {
                            trackingId: id,
                            userAgent: navigator.userAgent,
                            timestamp: new Date(),
                        }
                        let data = {
                           "id": anonTrackingId,
                           "page": window.location.pathname,
                           "state": state,
                           "timestamp": new Date(),                          
                        };
                    }
                    function logState(state) {
                        console.log(\`Flarelytics: page is \${state}\`);
                        
                    }

                    function startTracking() {
                        const tracking_id = crypto.randomUUID();
                        const userAgent = navigator.userAgent;
                       
                        
                        let state;

                        if (document.visibilityState === "visible") {
                            state = "visible";
                            logState(state);
                            // Uncomment the line below to send the event
                            // sendEvent(tracking_id, state);
                        }

                        document.addEventListener("visibilitychange", () => {
                            let new_state = document.visibilityState === "visible" ? "visible" : "hidden";

                            if (new_state !== state) {
                                state = new_state;
                                logState(state);
                                // Uncomment the line below to send the event
                                // sendEvent(tracking_id, state);
                            }
                        });
                    }

                    startTracking();
                `}
        </Script>
      <Header />
      <Hero />
      <Statistics />
      <HowItWorks />
      <AboutUs />
      <Support />
      <ContactUs />
    </>

  );
}

