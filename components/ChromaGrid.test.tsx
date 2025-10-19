import React from 'react';
import { render, screen } from '@testing-library/react';
import ChromaGrid from './ChromaGrid';

// Mock gsap
jest.mock('gsap', () => ({
  gsap: {
    quickSetter: jest.fn(),
    to: jest.fn(),
  }
}));

describe('ChromaGrid', () => {
  const mockItems = [
    {
      image: 'https://example.com/image1.jpg',
      title: 'John Doe',
      subtitle: 'Developer',
      handle: '@johndoe',
      location: 'New York',
      borderColor: '#FF0000',
      gradient: 'linear-gradient(145deg, #FF0000, #000)',
      url: 'https://example.com'
    },
    {
      image: 'https://example.com/image2.jpg',
      title: 'Jane Smith',
      subtitle: 'Designer',
      handle: '@janesmith',
      location: 'London',
      borderColor: '#00FF00',
      gradient: 'linear-gradient(145deg, #00FF00, #000)',
      url: 'https://example.com'
    }
  ];

  test('renders without crashing', () => {
    render(<ChromaGrid items={mockItems} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('displays demo items when no items provided', () => {
    render(<ChromaGrid />);
    // Should render at least one of the demo items
    expect(screen.getAllByRole('article')).toHaveLength(6);
  });

  test('applies custom class names', () => {
    render(<ChromaGrid items={mockItems} className="custom-class" />);
    const gridElement = screen.getByRole('grid');
    expect(gridElement).toHaveClass('custom-class');
  });
});