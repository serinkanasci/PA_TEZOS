import { useState } from "react";
import { mint } from "../utils/wallet";
import { createNFT } from '../api/functions';

export default function ManageNFT(props) {
  const [nftUri, setnftUri] = useState(""); 
  const [price, setPrice] = useState(0); 


    const manageNft = async () => {

        if(nftUri.localeCompare("")!==0 && price > 0){
            const nft = {
                nftUri: nftUri,
                creator_etps: props.creator_etps,
                price: price
            }
            console.log("nft",nft)
            createNFT(nft).then(res =>{
              console.log("id",res.nft.id);
              mint(res.nft.id, nftUri);
            })
            
        }
    }
  return (
    <div className="flex">

      <input
        type="text"
        name="nftUri"
        onChange={(e) => {
          console.log(e.target.value)
          setnftUri(e.target.value);
        }}
        value={nftUri}
      />
      <input
        type="text"
        name="price"
        onChange={(e) => {
          console.log(e.target.value)
          setPrice(e.target.value);
        }}
        value={price}
      />
      <button
        onClick={() => {
            manageNft()
        }}
        className="bg-red-500 px-6 py-2 rounded-sm text-xs font-semibold uppercase text-white cursor-pointer"
      >
        CreateNFT
      </button>

    </div>
  );
}
