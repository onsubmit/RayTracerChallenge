//-----------------------------------------------------------------------
// <copyright file="Matrix.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using OnSubmit.RayTracerChallenge.Extensions;

    /// <summary>
    /// Represents a canvas.
    /// </summary>
    public sealed class Matrix
    {
        /// <summary>
        /// The matrix elements.
        /// </summary>
        private readonly double[,] elements;

        /// <summary>
        /// Cache for the determinant value.
        /// </summary>
        private double? determinant;

        /// <summary>
        /// Cache for the matrix inverse.
        /// </summary>
        private Matrix inverse;

        /// <summary>
        /// Initializes a new instance of the <see cref="Matrix"/> class.
        /// </summary>
        /// <param name="rows">Number of rows.</param>
        /// <param name="columns">Number of columns.</param>
        public Matrix(int rows, int columns)
        {
            this.elements = new double[rows, columns];
            this.Rows = rows;
            this.Columns = columns;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Matrix"/> class.
        /// </summary>
        /// <param name="elements">The matrix elements.</param>
        public Matrix(double[,] elements)
        {
            this.elements = elements ?? throw new ArgumentNullException(nameof(elements));
            this.Rows = (int)elements.GetLength(0);
            this.Columns = (int)elements.GetLength(1);
        }

        /// <summary>
        /// Gets the number of rows.
        /// </summary>
        public int Rows { get; private set; }

        /// <summary>
        /// Gets the number of columns.
        /// </summary>
        public int Columns { get; private set; }

        /// <summary>
        /// Gets a value indicating whether the matrix is square.
        /// </summary>
        public bool IsSquare => this.Rows == this.Columns;

        /// <summary>
        /// Gets a value indicating whether the matrix is invertible.
        /// </summary>
        public bool IsInvertible => this.GetDeterminant() != 0;

        /// <summary>
        /// Indexer for the matrix.
        /// </summary>
        /// <param name="r">Row index.</param>
        /// <param name="c">Column index.</param>
        /// <returns>The value at the given indices.</returns>
        public double this[int r, int c]
        {
            get
            {
                return this.elements[r, c];
            }

            set
            {
                this.ResetCachedValues();
                this.elements[r, c] = value;
            }
        }

        /// <summary>
        /// Multiples a matrix by a matrix.
        /// </summary>
        /// <param name="a">First matrix.</param>
        /// <param name="b">Second matrix.</param>
        /// <returns>The resultant matrix from the matrix multiplication.</returns>
        public static Matrix operator *(Matrix a, Matrix b)
        {
            if (a.Columns != b.Rows)
            {
                throw new InvalidOperationException("Invalid dimensions. Cannot multiply these matrices.");
            }

            int rows = a.Rows;
            int columns = b.Columns;
            int productsPerEntry = a.Columns;

            double[,] elements = new double[rows, columns];
            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < columns; c++)
                {
                    double sum = 0;
                    for (int k = 0; k < productsPerEntry; k++)
                    {
                        sum += a[r, k] * b[k, c];
                    }

                    elements[r, c] = sum;
                }
            }

            return new Matrix(elements);
        }

        /// <summary>
        /// Multiples a matrix by a tuple.
        /// </summary>
        /// <param name="m">The matrix.</param>
        /// <param name="t">The tuple.</param>
        /// <returns>The resultant tuple from multiplying the matrix by the tuple.</returns>
        public static Tuple4D operator *(Matrix m, Tuple4D t)
        {
            if (m.Columns != t.Length)
            {
                throw new InvalidOperationException("Invalid dimensions. Cannot multiply this matrix by this tuple.");
            }

            int rows = m.Rows;
            int columns = m.Columns;

            double[] elements = new double[rows];
            for (int r = 0; r < rows; r++)
            {
                double sum = 0;
                for (int c = 0; c < columns; c++)
                {
                    sum += m[r, c] * t[c];
                }

                elements[r] = sum;
            }

            return new Tuple4D(elements);
        }

        /// <summary>
        /// Gets the identity matrix of the desired size.
        /// </summary>
        /// <param name="size">The size of the identity matrix.</param>
        /// <returns>The identity matrix.</returns>
        public static Matrix GetIdentityMatrix(int size)
        {
            if (size < 1)
            {
                throw new ArgumentOutOfRangeException(nameof(size), "Size must be positive.");
            }

            double[,] elements = new double[size, size];
            for (int i = 0; i < size; i++)
            {
                elements[i, i] = 1;
            }

            return new Matrix(elements);
        }

        /// <summary>
        /// Transposes the matrix.
        /// </summary>
        /// <returns>The transposed matrix.</returns>
        public Matrix Transpose()
        {
            double[,] elements = new double[this.Columns, this.Rows];
            for (int r = 0; r < this.Rows; r++)
            {
                for (int c = 0; c < this.Columns; c++)
                {
                    elements[c, r] = this[r, c];
                }
            }

            return new Matrix(elements);
        }

        /// <summary>
        /// Gets the determinant of the matrix.
        /// </summary>
        /// <returns>The determinant.</returns>
        public double GetDeterminant()
        {
            if (this.determinant.HasValue)
            {
                return this.determinant.Value;
            }

            if (!this.IsSquare)
            {
                throw new InvalidOperationException("The determinant can only be found for square matrices.");
            }

            int size = this.Rows;
            switch (size)
            {
                case 2:
                    this.determinant = (this[0, 0] * this[1, 1]) - (this[0, 1] * this[1, 0]);
                    return this.determinant.Value;
                case 3:
                case 4:
                    this.determinant = 0;
                    for (int c = 0; c < this.Columns; c++)
                    {
                        this.determinant += this[0, c] * this.GetCofactor(0, c);
                    }

                    return this.determinant.Value;
            }

            throw new NotImplementedException($"Don't yet know how to calculate the determinant of a {size}x{size} matrix.");
        }

        /// <summary>
        /// Gets the inverse of the matrix.
        /// </summary>
        /// <returns>The inverse of the matrix.</returns>
        public Matrix GetInverse()
        {
            if (this.inverse != null)
            {
                return this.inverse;
            }

            if (!this.IsInvertible)
            {
                throw new InvalidOperationException("Matrix is not invertible.");
            }

            double[,] elements = new double[this.Rows, this.Columns];
            for (int r = 0; r < this.Rows; r++)
            {
                for (int c = 0; c < this.Columns; c++)
                {
                    // Note that [c, r] is intentional.
                    elements[c, r] = this.GetCofactor(r, c) / this.GetDeterminant();
                }
            }

            this.inverse = new Matrix(elements);
            return this.inverse;
        }

        /// <summary>
        /// Gets the minor of the matrix element at (<paramref name="row"/>, <paramref name="column"/>).
        /// </summary>
        /// <param name="row">The row index.</param>
        /// <param name="column">The column index.</param>
        /// <returns>The minor.</returns>
        public double GetMinor(int row, int column) => this.GetSubMatrix(row, column).GetDeterminant();

        /// <summary>
        /// Gets the cofactor of the matrix element at (<paramref name="row"/>, <paramref name="column"/>).
        /// </summary>
        /// <param name="row">The row index.</param>
        /// <param name="column">The column index.</param>
        /// <returns>The cofactor.</returns>
        public double GetCofactor(int row, int column)
        {
            double minor = this.GetMinor(row, column);
            return (row + column).IsOdd() ? 0 - minor : minor;
        }

        /// <summary>
        /// Gets the submatrix that results from removing <paramref name="rowToRemove"/> and <paramref name="columnToRemove"/>.
        /// </summary>
        /// <param name="rowToRemove">The row to remove.</param>
        /// <param name="columnToRemove">The column to remove.</param>
        /// <returns>The submatrix.</returns>
        public Matrix GetSubMatrix(int rowToRemove, int columnToRemove)
        {
            if (this.Rows == 0 || this.Columns == 0)
            {
                throw new InvalidOperationException("Can't remove a row or column from an empty matrix.");
            }

            if (rowToRemove < 0 || rowToRemove >= this.Rows)
            {
                throw new ArgumentOutOfRangeException(nameof(rowToRemove));
            }

            if (columnToRemove < 0 || columnToRemove >= this.Rows)
            {
                throw new ArgumentOutOfRangeException(nameof(columnToRemove));
            }

            double[,] elements = new double[this.Rows - 1, this.Columns - 1];

            int rowAdjustment = 0;
            for (int r = 0; r < this.Rows; r++)
            {
                int colAdjustment = 0;
                if (r == rowToRemove)
                {
                    rowAdjustment = 1;
                    continue;
                }

                for (int c = 0; c < this.Columns; c++)
                {
                    if (c == columnToRemove)
                    {
                        colAdjustment = 1;
                        continue;
                    }

                    elements[r - rowAdjustment, c - colAdjustment] = this[r, c];
                }
            }

            return new Matrix(elements);
        }

        /// <summary>
        /// Generates a string representation of a <see cref="Matrix"/>.
        /// </summary>
        /// <returns>The string.</returns>
        public override string ToString() => this.ToString(-1);

        /// <summary>
        /// Generates a string representation of a <see cref="Matrix"/>.
        /// </summary>
        /// <param name="digits">The number of fractional digits in the return value.</param>
        /// <returns>The string.</returns>
        public string ToString(int digits)
        {
            StringBuilder sb = new StringBuilder();
            for (int r = 0; r < this.Rows; r++)
            {
                double[] row = new double[this.Columns];
                for (int c = 0; c < this.Columns; c++)
                {
                    row[c] = digits >= 0 ? Math.Round(this[r, c], digits) : this[r, c];
                }

                sb.AppendLine($"{{ {string.Join(", ", row)} }}");
            }

            return sb.ToString();
        }

        /// <summary>
        /// Compares a <see cref="Matrix"/> with another object.
        /// </summary>
        /// <param name="obj">The object to compare against.</param>
        /// <returns><c>crue</c> if the objects are piecewise equivalent, <c>false</c> otherwise.</returns>
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj))
            {
                return false;
            }

            if (ReferenceEquals(this, obj))
            {
                return true;
            }

            if (obj is Matrix m)
            {
                if (this.Rows != m.Rows || this.Columns != m.Columns)
                {
                    return false;
                }

                for (int r = 0; r < this.Rows; r++)
                {
                    for (int c = 0; c < this.Columns; c++)
                    {
                        if (!this[r, c].Compare(m[r, c]))
                        {
                            return false;
                        }
                    }
                }

                return true;
            }

            return false;
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="Matrix"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            return 272633004 + EqualityComparer<double[,]>.Default.GetHashCode(this.elements);
        }

        /// <summary>
        /// Marks the matrix as dirty.
        /// </summary>
        private void ResetCachedValues()
        {
            this.determinant = null;
            this.inverse = null;
        }
    }
}
