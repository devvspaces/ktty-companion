import { BookDetail } from '@/hooks/useUserBooks';

/**
 * Randomly select books from the available books map based on selection requirements
 * @param selectionMap - Map of series name to quantity needed (e.g., {"Ruby Book": 1, "Lucky Tome": 2})
 * @param booksMap - Map of series name to available book details
 * @returns Array of selected book details with NFT IDs
 */
export function selectBooksFromMap(
  selectionMap: Record<string, number>,
  booksMap: Record<string, BookDetail[]>
): BookDetail[] {
  const selectedBooks: BookDetail[] = [];

  // Process each series in the selection map
  for (const [seriesName, quantityNeeded] of Object.entries(selectionMap)) {
    if (quantityNeeded <= 0) continue;

    // Get available books for this series
    const availableBooks = booksMap[seriesName] || [];
    
    if (availableBooks.length === 0) {
      throw new Error(`No ${seriesName} books available`);
    }

    if (availableBooks.length < quantityNeeded) {
      throw new Error(`Not enough ${seriesName} books available. Need ${quantityNeeded}, have ${availableBooks.length}`);
    }

    // Create a copy of available books to avoid mutating original
    const booksCopy = [...availableBooks];
    
    // Randomly select the required quantity
    for (let i = 0; i < quantityNeeded; i++) {
      const randomIndex = Math.floor(Math.random() * booksCopy.length);
      const selectedBook = booksCopy.splice(randomIndex, 1)[0];
      selectedBooks.push(selectedBook);
    }
  }

  return selectedBooks;
}

/**
 * Extract book IDs from selected book details
 * @param selectedBooks - Array of selected book details
 * @returns Array of book IDs as bigint
 */
export function extractBookIds(selectedBooks: BookDetail[]): bigint[] {
  return selectedBooks.map(book => book.id);
}

/**
 * Validate selection against available books
 * @param selectionMap - Map of series name to quantity needed
 * @param booksMap - Map of series name to available book details
 * @returns Object with validation result and error message if invalid
 */
export function validateBookSelection(
  selectionMap: Record<string, number>,
  booksMap: Record<string, BookDetail[]>
): { isValid: boolean; error?: string } {
  for (const [seriesName, quantityNeeded] of Object.entries(selectionMap)) {
    if (quantityNeeded <= 0) continue;

    const availableBooks = booksMap[seriesName] || [];
    
    if (availableBooks.length === 0) {
      return {
        isValid: false,
        error: `No ${seriesName} books available`
      };
    }

    if (availableBooks.length < quantityNeeded) {
      return {
        isValid: false,
        error: `Not enough ${seriesName} books available. Need ${quantityNeeded}, have ${availableBooks.length}`
      };
    }
  }

  return { isValid: true };
}