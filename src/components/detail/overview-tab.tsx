import { Table, TableCell, TableRow } from '@mui/material';
import { ReactNode } from 'react';

interface IOverViewTab {
    headEl: string[];
    children: ReactNode[];
}

const OverViewTab: React.FC<IOverViewTab> = ({ headEl, children }) => {
    return (
        <div>
            <Table>
                {headEl.map((title, idx) => {
                    return (
                        <TableRow key={idx}>
                            <TableCell
                                variant="head"
                                align="left"
                                style={{ width: '30%' }}
                            >
                                {title}
                            </TableCell>
                            <TableCell>{children[idx]}</TableCell>
                        </TableRow>
                    );
                })}
            </Table>
        </div>
    );
};

export default OverViewTab;
