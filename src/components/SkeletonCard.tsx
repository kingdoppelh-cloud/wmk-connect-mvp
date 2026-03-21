import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl p-5 mb-5 bg-white border border-gray-100 shadow-sm relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="w-3/4">
                    <div className="h-3 w-1/3 bg-gray-200 rounded-full mb-2 animate-pulse" />
                    <div className="h-6 w-3/4 bg-gray-200 rounded-xl mb-2 animate-pulse" />
                    <div className="h-3 w-1/2 bg-gray-100 rounded-full mt-2 animate-pulse" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
            </div>

            <div className="space-y-2 mb-4 mt-4">
                <div className="h-4 w-full bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-100 rounded-lg animate-pulse" />
            </div>

            <div className="flex gap-2">
                <div className="h-5 w-16 bg-gray-200 rounded-md animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="col-span-2 h-12 bg-gray-200 rounded-xl animate-pulse" />
                <div className="flex gap-2 w-full mt-1 col-span-2">
                    <div className="flex-1 h-12 bg-gray-100 rounded-xl animate-pulse" />
                    <div className="flex-1 h-12 bg-gray-100 rounded-xl animate-pulse" />
                    <div className="flex-1 h-12 bg-gray-100 rounded-xl animate-pulse" />
                </div>
            </div>
        </motion.div>
    );
};
