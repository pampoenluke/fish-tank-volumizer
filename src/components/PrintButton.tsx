import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button 
      onClick={handlePrint}
      className="mt-6 w-full md:w-auto"
      variant="outline"
    >
      <Printer className="mr-2 h-4 w-4" />
      Print Results
    </Button>
  );
};

export default PrintButton;