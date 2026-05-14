import React from 'react';
import { Award, ShieldCheck, Download, Printer } from 'lucide-react';

interface CertificateProps {
  apprenticeName: string;
}

export function Certificate({ apprenticeName }: CertificateProps) {
  const mentorName = "Fabiana Custodio de Oliveira";
  const mentorRole = "Head de Qualidade";
  const company = "Foursys";
  const date = new Date().toLocaleDateString('pt-BR');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-12 rounded-3xl border-8 border-double border-slate-100 shadow-2xl relative print:border-8 print:shadow-none print:m-0">
        {/* Certificate Border Accents */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-blue-600 rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-blue-600 rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-blue-600 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-blue-600 rounded-br-xl" />

        <div className="text-center space-y-8 relative z-10">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-200">
              <Award className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Certificado de Conclusão</h1>
            <h2 className="text-4xl font-black text-slate-900 font-serif">Studio de QA - Treinamento Prático</h2>
          </div>

          <div className="py-8 space-y-4">
            <p className="text-slate-500 italic">Certificamos que</p>
            <p className="text-5xl font-bold text-slate-800 underline decoration-blue-500 underline-offset-8">
              {apprenticeName || "Nome do Aprendiz"}
            </p>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed pt-4">
              concluiu com êxito o treinamento prático em <strong>Qualidade de Software</strong> com foco na metodologia 
              <strong> Shift Left Testing</strong>, demonstrando competência em escrita de cenários Gherkin, 
              gestão de execuções, reporte de bugs e validação em múltiplos ambientes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 pt-12 items-end">
            <div className="space-y-4">
              <div className="border-b-2 border-slate-200 pb-2 mx-auto w-64">
                <p className="text-lg font-bold text-slate-800 italic font-serif">{mentorName}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{mentorRole}</p>
                <p className="text-xs text-slate-500 uppercase tracking-tighter">{company}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center mb-2">
                <ShieldCheck className="w-12 h-12 text-green-500 opacity-20" />
              </div>
              <p className="text-sm font-bold text-slate-900">Data de Emissão</p>
              <p className="text-sm text-slate-500">{date}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 print:hidden">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:-translate-y-1"
        >
          <Printer className="w-5 h-5" />
          Imprimir Certificado
        </button>
      </div>

      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\:bg-white {
            visibility: visible;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\:bg-white * {
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
}
