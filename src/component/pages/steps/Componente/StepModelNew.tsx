type Step = {
    id: number;
    highlighted: boolean;
    completed: boolean;
    description: string;
};

type StepModelNewProps = {
    index: number;
    step: Step;
    estado: boolean[];
};

function StepModelNew(props: StepModelNewProps) {
    const { index, step, estado } = props;

    const auxiliar = estado.indexOf(false) + 1;

    const calculateStepColor = () => {
        if (!step.highlighted) {
            return "bg-white border-gray-300";
        }
        if (!(step.completed && estado[step.id - 1])) {
            return "bg-[#e8b962] border-[#e8b962]";
        }
        return "bg-[#22a75a] font-bold border-[#22a75a] text-3xl";
    };

    const calculateStepIcon = () => {
        if (!step.completed) {
            if (step.id < auxiliar) {
                return <span><i className="bi bi-check-lg" /></span>;
            }
            if (step.id === auxiliar) {
                return <span><i className="bi bi-clock-history" /></span>;
            }
            if (step.id > auxiliar) {
                return <strong className=' text-lg'>{index + 1}</strong>;
            }
        }
        if (!estado[step.id - 1]) {
            return <span><i className={`bi bi-clock-history ${step.highlighted && 'text-white'}`} /></span>;
        }
        return <span><i className={`bi bi-check-lg ${step.highlighted && 'text-white'}`} /></span>;
    };

    const calculateStepText = () => {
        if (!step.highlighted) {
            return "text-gray-400 text-xs font-normal";
        }
        if (!(step.completed && estado[step.id - 1])) {
            return "text-[#e8b962]";
        }
        return "text-[#22a75a]";
    };

    return (
        <div className={"flex items-center"}>
            <div className={`flex-auto border-y-4 transition duration-500 ease-in-out border-gray-300`} />
            <div className="relative flex flex-col items-center">
                <div className={`rounded-full transition duration-500 ease-in-out border-4 h-12 w-12 flex items-center justify-center py-3 text-gray-300 font-bold text-2xl 
                    ${calculateStepColor()}
                `}>
                    {calculateStepIcon()}
                </div>

                <div className={`absolute top-0 text-center mt-16 w-40 text-sm font-black 
                    ${calculateStepText()}
                `}>
                    <strong>
                        {step.description}
                    </strong>
                </div>
            </div>

        </div>
    );
}

export default StepModelNew;