import React from 'react';
import { Flag, Smartphone, ArrowRight } from 'lucide-react';

interface ProcessStep {
    title: string;
    description: string;
}

interface SacredRitualProcessProps {
    steps?: ProcessStep[];
}

const SacredRitualProcess: React.FC<SacredRitualProcessProps> = ({ steps }) => {
    // Default steps if none provided (fallback/static content matching screenshot)
    const defaultSteps = [
        {
            title: "Personal Sankalp Grahan",
            description: "Pandit Ji chants your Name and Purpose to establish your spiritual presence in the holy Dham."
        },
        {
            title: "Complete Vedic Paath",
            description: "Full recitation of 60 chapters by Ayodhya Brahmins following traditional Gurukul Chhanda rhythms."
        },
        {
            title: "WhatsApp Proof",
            description: "A personalized video recording of your Sankalp is sent to you immediately after completion for total faith."
        }
    ];

    const displaySteps = steps || defaultSteps;

    return (
        <div className="py-12 bg-white">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-red-900 mb-12">
                Our Sacred Ritual Process
            </h2>

            <div className="max-w-4xl mx-auto space-y-12 px-4">
                {/* Step 1 */}
                <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center">
                        <Flag className="w-8 h-8 text-red-600 fill-current" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">1. {displaySteps[0]?.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {displaySteps[0]?.description}
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center">
                        <span className="text-3xl font-bold text-purple-600 leading-none pb-2">ॐ</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">2. {displaySteps[1]?.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {displaySteps[1]?.description}
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center relative">
                        <Smartphone className="w-8 h-8 text-blue-600 fill-current" />
                        <ArrowRight className="w-4 h-4 text-blue-500 absolute -right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-0.5 border border-blue-100" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">3. {displaySteps[2]?.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {displaySteps[2]?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SacredRitualProcess;
