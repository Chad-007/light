
import { MainButton } from "@/components/buttons/MainButton";
import { AnotherButton } from "@/components/buttons/AnotherButton";

export const Feature = ({title, subtitle}: {title: string, subtitle: string}) => {
    return (
        <div className="card p-6 m-4 max-w-lg">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-white">
                    {title}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                    {subtitle}
                </p>
                <div className="flex flex-col gap-3 pt-4">
                    <MainButton onClick={() => alert('Feature activated')}>
                        Learn More
                    </MainButton>
                    <AnotherButton onClick={() => alert('Demo started')}>
                        Try Demo
                    </AnotherButton>
                </div>
            </div>
        </div>
    );
}
