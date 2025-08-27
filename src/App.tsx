import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Brands from "./pages/Brands";
import Models from "./pages/Models";
import GuitarDetails from "./pages/GuitarDetails";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message?: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(err: any) {
    return { hasError: true, message: String(err?.message || err) };
  }
  componentDidCatch(err: any) {
    console.error("[ErrorBoundary]", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-600">{this.state.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function NotFound() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-2">404 – Not Found</h1>
      <p className="text-gray-600">This route does not exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Brands />} />
          <Route path="/brand/:id" element={<Models />} />
          <Route path="/brand/:id/model/:modelId" element={<GuitarDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
