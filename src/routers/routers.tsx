import { Reports } from "../pages/Reports";
import { CashRegisters } from "../pages/CashRegisters";

import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";

export function MyRoutes() {
    return (
        <Routes>
            <Route>
                <Route path="/reportes" element={<Reports />} />
                <Route path="/caja" element={<CashRegisters />} />
                <Route path="/dashboard/:id" element={<Dashboard />} />
            </Route>
        </Routes>
    );
}
