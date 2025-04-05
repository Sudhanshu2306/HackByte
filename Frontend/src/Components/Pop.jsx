import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Backendurl } from '../../Private/backend';
function Pop({id}) {

    const [matchedData, setMatchIdData] = useState({});

    useEffect(() => {
        const fetchMatched = async () => {
            try {
                // console.log("Fetching match details...");
                // Fetch lost members from the backend
                const response = await axios.get(`${Backendurl}/api/v1/users/matched/${id}`, {
                    withCredentials: true, 
                });
                // console.log(response.data);
                setMatchIdData(response.data);
            } catch (error) {
                console.error("Error fetching lost members:", error);
            }
        };

        if (id) fetchMatched();
    }, [id]);

  return (
    <div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img class="w-full" src={matchedData.image_url} alt="Sunset in the mountains" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">
                {/* <h1>{id}</h1> */}
                <h1>{matchedData?.firstName+""+matchedData?.lastName}</h1>
                <h1>{matchedData?.phoneNumber}</h1>
                <h1>{matchedData?.description}</h1>
            </div>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          </div>
        </div>
    </div>
  )
}

export default Pop