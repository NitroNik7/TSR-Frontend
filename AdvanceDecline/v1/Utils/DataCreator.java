// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class DataCreator {
    public static void main(String[] args) {
        for (int k = 0; k < 7; k++) {
            for (int i = 0; i < 10; i++) {
                int advances, declines;
                int max = (10 - i) * 5;
                if (max > 40)
                    max = 40;
                int min = i * 5;
                if (min < 10)
                    min = 10;
                int cnt = 0;
                while (cnt < 5) {
                    advances = (int) (Math.random() * (max - min + 1)) + min;
                    declines = (int) (Math.random() * (max - min + 1)) + min;
                    if ((advances + declines) == 50) {
                        cnt++;
                        System.out.println(advances + "," + declines);

                    }
                }

            }
        }
    }
}
