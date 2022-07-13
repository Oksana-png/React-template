import React from "react"; //экспорт конструктора реакт
import { createRoot } from 'react-dom/client';
import './index.scss';

import Module from './module';

const root = createRoot(document.getElementById('root'));

root.render(<h1>Привет реакт</h1>);
root.render(<Module/>);