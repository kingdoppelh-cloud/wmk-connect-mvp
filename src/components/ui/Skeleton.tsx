import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'rect' }) => {
    return (
        <div
            aria-label="Ladeinhalt"
            className={cn(
                "animate-pulse bg-slate-200/60",
                variant === 'circle' && "rounded-full",
                variant === 'rect' && "rounded-2xl",
                variant === 'text' && "rounded-lg h-4 w-full",
                className
            )}
        />
    );
};

export const CompanyCardSkeleton = () => (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
        <Skeleton className="aspect-video w-full rounded-none" />
        <div className="p-6 space-y-3">
            <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-2/3" variant="text" />
                <Skeleton className="h-5 w-1/4 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-5/6" variant="text" />
            <div className="flex gap-2 pt-2">
                <Skeleton className="h-4 w-16" variant="text" />
                <Skeleton className="h-4 w-24" variant="text" />
            </div>
        </div>
    </div>
);

export const NewsCardSkeleton = () => (
    <div className="min-w-[280px] bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
            <Skeleton variant="circle" className="w-8 h-8" />
            <div className="space-y-1">
                <Skeleton variant="text" className="h-3 w-20" />
                <Skeleton variant="text" className="h-2 w-12" />
            </div>
        </div>
        <Skeleton variant="text" className="h-4 w-full mb-2" />
        <Skeleton variant="text" className="h-4 w-2/3 mb-4" />
        <div className="flex justify-between items-center">
            <Skeleton variant="text" className="h-3 w-12" />
            <Skeleton variant="circle" className="w-4 h-4" />
        </div>
    </div>
);
