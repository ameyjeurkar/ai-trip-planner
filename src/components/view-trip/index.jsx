import { db } from './../../service/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'sonner';
import InfoSection from './../../pages/InfoSection';
import Hotels from './../../pages/Hotels';
import PlacesToVisit from './../../pages/PlacesToVisit';
import Footer from './../../pages/Footer';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([])
    console.log("TRIP: ", trip);

    useEffect(() => {
        tripId && GetTripData()
    }, [tripId])

    // used to get trip info from firebase
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log("Document: ", docSnap.data())
            setTrip(docSnap.data());
        }

        else {
            toast("No trip found");
        }

    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip} />

            {/* Recommended Hotels */}
            <Hotels trip={trip} />

            {/* Daily Plan */}
            <PlacesToVisit trip={trip} />

            {/* Footer */}
            <Footer trip={trip} />
        </div>
    )
}

export default Viewtrip;