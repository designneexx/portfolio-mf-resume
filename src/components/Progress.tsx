interface ProgressProps {
    progress: number;
}

export function Progress({ progress }: ProgressProps) {
    return (
        <div className='border-solid border border-brand-500 p-[1px] rounded-full w-full'>
            <div className='h-[2px] bg-brand-500 rounded-full' style={{ width: `${progress}%` }} />
        </div>
    );
}
