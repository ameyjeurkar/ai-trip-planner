import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '../service/GlobalApi'
import { toast } from 'sonner';

function InfoSection({ trip }) {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {
        try {
            const data = {
                textQuery: trip?.userSelection?.location?.label
            }

            await GetPlaceDetails(data).then(resp => {
                console.log(resp.data.places[0].photos[3].name)
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
                setPhotoUrl(PhotoUrl)
            })
        }
        catch(error) {
            toast("Unable to fetch info details");
        }
    }
    
    return (
        <div class="trip-card">
            <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="Trip Image" class="trip-img" />
            <div class="trip-details">
                <h2 class="trip-location">{trip?.userSelection?.location?.label}</h2>
                <div class="trip-tags">
                    <span class="trip-tag">📅 {trip.userSelection?.noOfDays} Day</span>
                    <span class="trip-tag">💰 {trip.userSelection?.budget} Budget</span>
                    <span class="trip-tag">👥 Traveler/s: {trip.userSelection?.traveler}</span>
                </div>
            </div>
        </div>

    )
}

export default InfoSection