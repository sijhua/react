import * as React from 'react';
import styles from './index.module.css';
import {
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
    Popper,
    Collapse,
    List,
    ListItem,
    ListItemText,
    ListSubheader
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DataGrid from '../../dataGrid';

interface Props {
    t: (params: String) => string;
    getDatachange: (comd: string, data: any) => void;
    distance: any;
    toDecimal2:(x:any) => any;
}

function Distance(props: Props) {
    const { t ,toDecimal2} = props;

    const customerOrientatedColumn = [
        { id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },
        { id: 'distance', label: ['dashboard.acc.delivery.setDelivery.distance'], minWidth: 100 },
        { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.rate'], minWidth: 100 },
        {
            id: 'more',
            label: '',
            minWidth: 10,
            align: 'center'
        }
    ];

    const createData = (product: any) => {
        let rows = [];
        product.forEach((element: any, index: any) => {

            let rate = element.rate ? element.rate : element.percentage;
            rows.push({
                index: { item: element.index, type: 'string' },
                distance: { item: element.distance, type: 'slider_single' },
                rate: { item: rate ? toDecimal2(rate) : rate, type: 'rate' },
                editable: false
            });
        });
        return rows;
    };

    const [rows, setRows] = React.useState(createData(props.distance));
    const [value, setValue] = React.useState('female');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [expandOpen, setExpandOpen] = React.useState(false);
    const [editMenuListAnchorEl, setEditMenuListAnchorEl] = React.useState(null);
    const [editOpen, setEditOpen] = React.useState(false);
    const [currentRow, setCurrentRow] = React.useState(null);
    const [state, setState] = React.useState(0);
    const commandList = { ADD: 'Add', EDIT: 'Edit', SAVE: 'Save', DELETE: 'Delete' };

    const forceUpdate = () => {
        setState((prev) => (prev += 1));
    };

    const handleEdit = (event: any, row: any) => {
        setEditOpen((prev) => !prev);
        setCurrentRow(row);
        setEditMenuListAnchorEl(editMenuListAnchorEl ? null : event.currentTarget);
    };
    const handleexpandOpenClick = () => {
        setExpandOpen(!expandOpen);
    };

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    const onDatachange = (type: string, data: any, currentRow: any) => {
        setRows((prev) => {
            prev.map((p) => {
                if (p.index.item == currentRow.index.item) {
                    p.distance.item = data;
                }
            });
            update(prev);
            return prev;
        });
    };
    const handleAction = (ev: any, command: string, row?: any) => {
        switch (command) {
            case commandList.ADD:
                addNewRow();
                break;
            case commandList.EDIT:
                enableEdit(ev, row);
                break;
            case commandList.DELETE:
                deleteEdit(ev, row);
                break;
            default:
                break;
        }
    };
    const deleteEdit = (ev: any, row: any) => {
        setEditMenuListAnchorEl(null);
        setEditOpen(false);
        setRows((prev) => {
            let temp = JSON.parse(JSON.stringify(prev));
            temp.map((p, i) => {
                if (p.index.item == row.index.item) {
                    prev.splice(i, 1);
                }
            });
            update(prev);
            return prev;
        });

        forceUpdate();
    };
    const onEditValue = (ev: any, command: string, row: any) => {
        setRows((prev) => {
            prev.map((p) => {
                if (p.index.item == row.index.item) {
                    p[command].item = ev.target.value;
                }
            });
            update(prev);
            return prev;
        });

        forceUpdate();
    };

    const enableEdit = (ev: any, row: any) => {
        setRows((prev) => {
            prev.forEach((p, i) => {
                if (p.index.item == row.index.item) {
                    p.editable = true;
                }
            });
            update(prev);
            return prev;
        });

        forceUpdate();
    };
    const addNewRow = () => {
        setRows((prev) => {
            prev.push({
                index: { item: prev.length, type: 'string' },
                distance: { item: 0, type: 'slider_single' },
                rate: { item: 0 },
                editable: true
            });
            update(prev);
            return prev;
        });
    };
    const formated = (cmd: string, id: any) => {

        setRows((prev) => {
            if (cmd == 'rate') prev[id][cmd].item = toDecimal2(prev[id][cmd].item);
            return prev;
        });
        forceUpdate();
    };


    const update = (data) => {
        if (data) {
            let clean = [];
            data.map((p, i) => {
                clean.push({
                    index: p.index.item,
                    distance: p.distance.item,
                    percentage: p.rate.item
                });
            });
            props.getDatachange('distance', clean);
        }
    };
    return (
        <div className={styles.customer_container}>
            <DataGrid
                t={t}
                columns={customerOrientatedColumn}
                rows={rows}
                singlePage={true}
                onDatachange={onDatachange}
                editMenuListAnchorEl={editMenuListAnchorEl}
                editOpen={editOpen}
                handleEdit={handleEdit}
                delivery={true}
                handleAction={handleAction}
                onEditValue={onEditValue}
                formated={formated}
            />
        </div>
    );
}

export default Distance;
