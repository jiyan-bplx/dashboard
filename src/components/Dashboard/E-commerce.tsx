// 'use client';

// import React, { useState } from 'react';
// import dynamic from "next/dynamic";
// import ChartOne from "../Charts/ChartOne";
// import ChartTwo from "../Charts/ChartTwo";
// import ChatCard from "../Chat/ChatCard";
// import TableOne from "../Tables/TableOne";
// import CardDataStats from "../CardDataStats";

// const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
//   ssr: false,
// });

// const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
//   ssr: false,
// });

// const ECommerce: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   return (
//     <>
//       <div className="bg-white p-4 shadow-md rounded-md flex items-center justify-between w-full">
//         <strong className="text-lg text-gray-700">Welcome to Bytesite Ai</strong>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//           onClick={toggleModal}
//         >
//           Click Me
//         </button>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center bg-black bg-opacity-50 text-black-2">
//           <div className="relative p-4 w-full max-w-md max-h-full">
//             <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//               {/* Modal header */}
//               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                  Genereate New Website
//                 </h3>
//                 <button
//                   type="button"
//                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                   onClick={toggleModal}
//                 >
//                   <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
//                   </svg>
//                   <span className="sr-only">Close modal</span>
//                 </button>
//               </div>
//               {/* Modal body */}
//               <form className="p-4 md:p-5">
//                 <div className="grid gap-4 mb-4 grid-cols-2">
//                   <div className="col-span-2">
//                     <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
//                     <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
//                   </div>
                 
//                   <div className="col-span-2 sm:col-span-1">
               
//                   </div>
//                   <div className="col-span-2">
//                     <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website Desciprtion</label>
//                     <textarea id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
//                   </div>
//                 </div>
//                 <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                   <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
//                   Generate
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ECommerce;
'use client';
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import Link from 'next/link';
import Image from 'next/image';

const MapOne = dynamic(() => import("@/components/Maps/MapOne"), { ssr: false });
const ChartOne = dynamic(() => import("../Charts/ChartOne"), { ssr: false });

interface CardData {
  id: string;
  companyName: string;
  description: string;
}

const ECommerce: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState<CardData[]>([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // Reset input fields when opening modal
    if (!isModalOpen) {
      setCompanyName('');
      setDescription('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCard: CardData = {
      id: Date.now().toString(), // Simple unique id
      companyName,
      description
    };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem('cards', JSON.stringify(updatedCards));
    toggleModal();
  };

  useEffect(() => {
    const savedCards = localStorage.getItem('cards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  const handleDeleteCard = (id: string) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem('cards', JSON.stringify(updatedCards));
  };

  return (
    <>
      <div className="bg-white p-4 shadow-md rounded-md flex items-center justify-between w-full mb-4">
        <strong className="text-lg text-gray-700">Welcome to Bytesite Ai</strong>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={toggleModal}
        >
          Click Me
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <div className="relative">
              <Image 
                src="/images/website/card-img.jpg" 
                alt={card.companyName}
                width={400} 
                height={200} 
                layout="responsive"
              />
              <Link href="/help">
                <span className="absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
              </Link>
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{card.companyName}</div>
              <p className="text-gray-700 text-base">{card.description}</p>
              <button className="text-red-600 mt-2" onClick={() => handleDeleteCard(card.id)}>
                Delete Card
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 text-black-2">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 text-black-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Generate New Website
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                      placeholder="Enter company name" 
                      required 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website Description</label>
                    <textarea 
                      id="description" 
                      rows={4} 
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Write website description here"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>                    
                  </div>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H8a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Generate
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ECommerce;