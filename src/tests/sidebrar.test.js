// src/tests/sidebar.test.js

import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/Sidebar";  // Ajusta la ruta según tu estructura de archivos

describe("Sidebar Component", () => {
  test("should render sidebar with initial collapsed state", () => {
    render(<Sidebar />);
    
    // Verificar que el sidebar tiene la clase 'w-16' (collapsed)
    const sidebar = screen.getByRole("navigation");
    expect(sidebar).toHaveClass("w-16");
    
    // Verificar que el logo no está visible en el estado colapsado
    const logo = screen.queryByAltText("Logo");
    expect(logo).not.toBeInTheDocument();
    
    // Verificar que los elementos del menú están presentes
    const homeButton = screen.getByRole("button", { name: /Inicio/i });
    expect(homeButton).toBeInTheDocument();
  });

  test("should expand the sidebar when the toggle button is clicked", () => {
    render(<Sidebar />);
    
    // Hacer clic en el botón de expansión
    const toggleButton = screen.getByLabelText("Toggle Sidebar");
    fireEvent.click(toggleButton);

            // Verificar que el sidebar ahora tiene la clase 'w-48' (expanded)
    const sidebar = screen.getByRole("navigation");
    expect(sidebar).toHaveClass("w-48");
    
    // Verificar que el logo es visible ahora que el sidebar está expandido
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    
    // Verificar que los textos de los elementos de menú son visibles
    const homeText = screen.getByText(/Inicio/i);
    expect(homeText).toBeInTheDocument();
    
    const profileText = screen.getByText(/Perfil/i);
    expect(profileText).toBeInTheDocument();
    
    const libraryText = screen.getByText(/Citas/i);
    expect(libraryText).toBeInTheDocument();
  });

  test("should set 'home' as active when the home button is clicked", () => {
    render(<Sidebar />);
    
    // Hacer clic en el botón de "Inicio"
    const homeButton = screen.getByRole("button", { name: /Inicio/i });
    fireEvent.click(homeButton);
    
    // Verificar que el botón de "Inicio" tiene la clase activa
    expect(homeButton).toHaveClass("bg-green-200 text-black font-semibold");
    
    // Verificar que los otros botones no tienen la clase activa
    const profileButton = screen.getByRole("button", { name: /Perfil/i });
    expect(profileButton).not.toHaveClass("bg-green-200 text-black font-semibold");
    
    const libraryButton = screen.getByRole("button", { name: /Citas/i });
    expect(libraryButton).not.toHaveClass("bg-green-200 text-black font-semibold");
  });

  test("should trigger logout when the logout button is clicked", () => {
    render(<Sidebar />);
    
    // Simular un clic en el botón de logout
    const logoutButton = screen.getByRole("button", { name: /Salir/i });
    fireEvent.click(logoutButton);
    
    // Verificar si la acción de logout se ha ejecutado (por ejemplo, un console.log, etc.)
    // Si quieres testear esto, puedes usar un mock para console.log o alguna función relacionada con logout
    // Por ejemplo:
    const consoleSpy = jest.spyOn(console, "log");
    fireEvent.click(logoutButton);
    expect(consoleSpy).toHaveBeenCalledWith("Logout");
  });
});
