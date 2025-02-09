import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportPDF = ({ transactions, type }) => {
    const exportToPDF = () => {
        const doc = new jsPDF();
        const title = type === 'Ingreso' ? 'Lista de Ingresos' : 'Lista de Egresos';
        const color = type === 'Ingreso' ? [0, 128, 0] : [200, 0, 0]; // Verde para ingresos, rojo para egresos

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(33, 33, 33);
        doc.text(title, 14, 15);

        const groupedData = transactions.reduce((acc, transaction) => {
            const month = new Date(transaction.date).toLocaleString('es-ES', { month: 'long', year: 'numeric' });
            if (!acc[month]) acc[month] = { transactions: [], total: 0 };
            acc[month].transactions.push(transaction);
            acc[month].total += transaction.amount;
            return acc;
        }, {});

        let y = 25;
        Object.keys(groupedData).forEach((month, index) => {
            if (index > 0) doc.addPage(); // Nueva página para cada mes

            doc.setFontSize(14);
            doc.setTextColor(52, 152, 219);
            doc.text(month.charAt(0).toUpperCase() + month.slice(1), 14, y); // Capitaliza mes

            const tableColumn = ['Fecha', 'Categoría', 'Monto'];
            const tableRows = groupedData[month].transactions.map(transaction => [
                transaction.date,
                transaction.category,
                transaction.amount.toLocaleString('es-ES')
            ]);

            doc.autoTable({
                startY: y + 5,
                head: [tableColumn],
                body: tableRows,
                theme: 'grid',
                styles: { fontSize: 10, cellPadding: 4 },
                headStyles: { fillColor: [44, 62, 80], textColor: 255, fontSize: 11 },
                alternateRowStyles: { fillColor: [240, 240, 240] },
                columnStyles: {
                    2: { halign: 'right', textColor: color, fontStyle: 'bold' },
                },
                margin: { top: 20 }
            });

            let finalY = doc.lastAutoTable.finalY + 10;
            doc.setFontSize(12);
            doc.setTextColor(color);
            doc.text(`Total del mes: ${groupedData[month].total.toLocaleString('es-ES')}`, 14, finalY);
            y = finalY + 10;
        });

        doc.addPage();
        doc.setFontSize(14);
        doc.setTextColor(33, 33, 33);
        doc.text(`Total General de ${title}:`, 14, 20);

        const totalGeneral = Object.values(groupedData).reduce((acc, data) => acc + data.total, 0);
        doc.setFontSize(16);
        doc.setTextColor(color);
        doc.text(`${totalGeneral.toLocaleString('es-ES')}`, 14, 30);

        doc.save(`${title}.pdf`);
    };

    return (
        <button className="btn btn-danger my-3" onClick={exportToPDF}>
            Descargar PDF
        </button>
    );
};

export default ExportPDF;
