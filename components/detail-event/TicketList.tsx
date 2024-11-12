'use client';

import { useState } from 'react';

interface Ticket {
    type: string;
    price: number;
    available_quantity: number;
    max_per_account: number;
}

interface TicketListProps {
    tickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
    const [ticketCounts, setTicketCounts] = useState<number[]>(new Array(tickets.length).fill(0));

    const incrementTicketCount = (index: number) => {
        const newCounts = [...ticketCounts];
        if (newCounts[index] < tickets[index].max_per_account) {
            newCounts[index] += 1;
            setTicketCounts(newCounts);
        }
    };

    const decrementTicketCount = (index: number) => {
        const newCounts = [...ticketCounts];
        if (newCounts[index] > 0) {
            newCounts[index] -= 1;
            setTicketCounts(newCounts);
        }
    };

    return (
        <div className="tickets mt-5">
            <h3 className="text-2xl md:text-4xl font-bold">Tickets</h3>
            {tickets.map((ticket, index) => (
                <div
                    key={index}
                    className="ticket flex  lg:flex-row h-auto sm:h-28 justify-between items-center p-4 border border-[#E1DEE3] rounded-md mt-8">
                    <div className="ticket-info sm:ali">
                        <p className="text-base sm:text-lg font-semibold">{ticket.type}</p>
                        <p className="text-gray-600">${ticket.price.toFixed(2)}</p>
                    </div>
                    <div className="ticket-controls flex items-center mt-4 sm:mt-0">
                        <button
                            className="px-3 py-1 bg-gray-200 rounded-l-lg text-xl"
                            onClick={() => decrementTicketCount(index)}
                        >
                            -
                        </button>
                        <span className="px-4 py-1">{ticketCounts[index]}</span>
                        <button
                            className={`px-3 py-1 rounded-r-lg text-white text-xl ${
                                ticketCounts[index] >= ticket.max_per_account
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#3F97DE] cursor-pointer'
                            }`}
                            onClick={() => incrementTicketCount(index)}
                            disabled={ticketCounts[index] >= ticket.max_per_account}
                        >
                            +
                        </button>
                    </div>
                </div>
            ))}
            <div className="mt-4 flex justify-center mb-5">
                <button className="px-4 py-2 h-12 bg-red-500 text-white rounded-lg text-sm md:text-base">
                    Confirm Ticket
                </button>
            </div>
        </div>
    );
};

export default TicketList;
