type StepControlProps = {
    handleClick: (direction: string) => void;
    currentStep: number;
    steps: any[];
    estadoModel: boolean[];
};

function StepControl({ handleClick, currentStep, steps, estadoModel }: StepControlProps) {
    const valido = ' bg-[#22a75a] border-2 border-[#22a75a] hover:bg-[#16793f] hover:border-[#16793f] hover:text-white transition duration-200 ease-in-out cursor-pointer';
    const blockDelim = ' bg-slate-700 border-2 border-slate-300 transition duration-200 ease-in-out cursor-not-allowed opacity-50';
    const blockEstado = ' bg-[#e8b962] border-2 border-[#e8b962] cursor-not-allowed hover:bg-[#ac853d] hover:border-[#ac853d] hover:text-white transition duration-200 ease-in-out';

    const solicitud_proceso = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e)
    };

    return (
        <div className="flex gap-4 w-32">
            <div className="flex w-full justify-between text-xl">
                <div className="flex flex-col">
                    <button
                        onClick={() => handleClick("back")}
                        className={`text-white uppercase py-2 px-4 rounded-md font-semibold ${currentStep === 1 ? blockDelim : valido}`}
                    >
                        {currentStep === 1 ? <i className="bi bi-lock text-gray-400" /> : <i className="bi bi-arrow-left" />}
                    </button>
                    <div className="text-center text-[#22a75a]">
                        <span className='text-xs font-medium'>
                            {currentStep === 1 ? '' : 'Atrás'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col">
                    <button
                        onClick={estadoModel[currentStep - 1] ? () => handleClick("next") : solicitud_proceso}
                        className={`text-white uppercase py-2 px-4 rounded-md font-semibold ${currentStep === steps.length ? blockDelim : (estadoModel[currentStep - 1] ? valido : blockEstado)}`}
                    >
                        {currentStep === steps.length ? <i className="bi bi-lock text-gray-400" /> : (estadoModel[currentStep - 1] ? <i className="bi bi-arrow-right" /> : <i className="bi bi-clock" />)}
                    </button>
                    <div className={`text-center ${currentStep === steps.length ? '' : (estadoModel[currentStep - 1] ? 'text-[#22a75a]' : 'text-[#e8b962]')}`}>
                        <span className='text-xs font-medium'>
                            {
                                currentStep === steps.length ? '' : (estadoModel[currentStep - 1] ?
                                    'Adelante' : 'En proceso'
                                )
                            }
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default StepControl;