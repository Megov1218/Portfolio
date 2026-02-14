export default function Footer() {
    return (
        <footer className="py-8 bg-surface border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Portfolio. Built with React & Tailwind.
                </p>
            </div>
        </footer>
    );
}
