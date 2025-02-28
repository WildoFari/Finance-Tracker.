import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportPDF = ({ transactions, type }) => {
    const exportToPDF = () => {
        const doc = new jsPDF();
        const title = type === 'Ingreso' ? 'Lista de Ingresos' : 'Lista de Egresos';
        const color = type === 'Ingreso' ? [0, 128, 0] : [200, 0, 0];

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(33, 33, 33);
        doc.text(title, 14, 15);

        const groupedData = transactions.reduce((acc, transaction) => {
            const month = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(new Date(transaction.date));
            if (!acc[month]) acc[month] = { transactions: [], total: 0 };
            acc[month].transactions.push(transaction);
            acc[month].total += transaction.amount;
            return acc;
        }, {});

        let y = 25;
        Object.entries(groupedData).forEach(([month, data], index) => {
            if (index > 0) doc.addPage();
            doc.setFontSize(14);
            doc.setTextColor(52, 152, 219);
            doc.text(month.charAt(0).toUpperCase() + month.slice(1), 14, y);

            // Datos de la tabla
            const tableColumn = ['Fecha', 'Categoría', 'Monto'];
            const tableRows = data.transactions.map(transaction => [
                new Intl.DateTimeFormat('es-ES').format(new Date(transaction.date)),
                transaction.category,
                transaction.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            ]);

            doc.autoTable({
                startY: y + 5,
                head: [tableColumn],
                body: tableRows,
                theme: 'grid',
                styles: { fontSize: 10, cellPadding: 4 },
                headStyles: { fillColor: [44, 62, 80], textColor: 255, fontSize: 11 },
                alternateRowStyles: { fillColor: [240, 240, 240] },
                columnStyles: { 2: { halign: 'right', textColor: color, fontStyle: 'bold' } },
                margin: { top: 20 }
            });

            let finalY = doc.lastAutoTable.finalY + 10;
            doc.setFontSize(12);
            doc.setTextColor(color);
            doc.text(`Total del mes: ${data.total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`, 14, finalY);
            y = finalY + 10;
        });

        doc.addPage();
        doc.setFontSize(14);
        doc.setTextColor(33, 33, 33);
        doc.text(`Total General de ${title}:`, 14, 20);

        const totalGeneral = Object.values(groupedData).reduce((acc, data) => acc + data.total, 0);
        doc.setFontSize(16);
        doc.setTextColor(color);
        doc.text(`${totalGeneral.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`, 14, 30);

        doc.save(`${title}.pdf`);
    };

    return (
        <button className="btn btn-danger my-3" onClick={exportToPDF}>
            Descargar PDF
        </button>
    );
};

export default ExportPDF;
