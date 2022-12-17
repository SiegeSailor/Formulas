// class MultiplicativeInverse {
//     static int function(int x, int m) {

//         for (int i = 1; i < m; i++)
//             if (((x % m) * (i % m)) % m == 1)
//                 return i;
//         return 1;
//     }

//     public static void main(String arrayOfArgument[]) {
//         int x = 87, m = 131;

//         System.out
//                 .println("y is the multiplicative inverse of " + x + " % " + m
//                         + " if (" + x + " * y) % " + m + " = 1");

//         int base = function(x, m);
//         int arrayOfInverses[] = new int[5];
//         for (int i = 0; i < 5; i++) {
//             System.out.println("y = " + base * i + " = " + base + " + (" + m + " * " + i + ")");
//             arrayOfInverses[i] = base * i;
//         }
//         System.out.print("The multiplicative inverses are ");
//         for (int i = 0; i < arrayOfInverses.length; i++)
//             System.out.print(arrayOfInverses[i] + (i == arrayOfInverses.length - 1 ? ", ...\n" : ", "));
//     }
// }

export {};
